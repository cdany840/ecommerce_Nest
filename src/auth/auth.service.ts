import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';

import { RegisterUserDto, CreateUserDto, UpdateAuthDto, LoginDto } from './dto';

import { User } from './entities/user.entity';

import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { UpdatePassDto } from './dto/update-password';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel( User.name ) 
    private userModel: Model<User>,

    private jwtService: JwtService,
   ) {}

  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    
    try {
      
      const { password, ...userData } = createUserDto;
           
      const newUser = new this.userModel({
        password: bcryptjs.hashSync( password, 10 ),
        ...userData
      });

       await newUser.save();
       const { password:_, ...user } = newUser.toJSON();
       
       return user;
      
    } catch (error) {
      if( error.code === 11000 ) {
        throw new BadRequestException(`${ createUserDto.email } already exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }

  }

  async register( registerDto: RegisterUserDto ): Promise<LoginResponse> {

    const user = await this.createUser(registerDto);

    const { password: userPassword, ...rest } = user;

    const payload = { id: user._id, name: user.name, ...rest };

    return {
      user: user,
      token: this.getJwtToken(payload)
    }
  }


  async login( loginDto: LoginDto ):Promise<LoginResponse> {

    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if ( !user ) {
      throw new UnauthorizedException('Not valid credentials - email');
    }
    
    if ( !bcryptjs.compareSync( password, user.password ) ) {
      throw new UnauthorizedException('Not valid credentials - password');
    }

    const { password: userPassword, ...rest } = user.toObject();

    const payload = { id: user.id, name: user.name, ...rest };
    const token = this.jwtService.sign(payload);

    return {
      user: user,
      token: token
    }
  
  }

  async updatePassword(_id: string, updatePass: UpdatePassDto) {

    const { oldPassword, newPassword, confirmPassword } = updatePass;
    
    const user = await this.userModel.findOne({ _id });
    if ( !user )
      throw new UnauthorizedException('Not valid credentials - user');

    if ( bcryptjs.compareSync( oldPassword, user.password ) )
      if (newPassword === confirmPassword) {
        const updateUser = await this.userModel.findOneAndUpdate(
          { _id }, 
          { password: bcryptjs.hashSync( newPassword, 10 ) }, 
          { new: true });
      }
    else 
      throw new UnauthorizedException('Not valid credentials - password');

    return "Password update";
  }


  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById( id: string ) {
    const user = await this.userModel.findById( id );
    const { password, ...rest } = user.toJSON();
    return rest;
  }


  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign(payload);
    return token;
  }

}
