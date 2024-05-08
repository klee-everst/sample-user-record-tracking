import { Controller, Get, Post, Put, Delete, Body, Query, Param, Res, HttpStatus, UseInterceptors  } from '@nestjs/common';
import { AppService } from './app.service';
import { ChangeTrackingInterceptor } from './interceptor/change-tracking.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Res() response, @Body() createUserDto: any) {
    try {
      const newUser = await this.appService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully', newUser});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const existingUser = await this.appService.findAll();
      if (existingUser == null) {
        throw new Error("Not user can be found");
      }
      return response.status(HttpStatus.FOUND).json({
        message: 'User found', existingUser,});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        message: 'Error: ' + err.message,
        error: 'Bad Request'
      });
    }
  }

  @Get('/:username')
  async findOne(@Res() response, @Param('username') username: string) {
    try {
      const existingUser = await this.appService.findOne(username);
      if (existingUser == null) {
        throw new Error(`User ${username} not found`);
      }
      return response.status(HttpStatus.FOUND).json({
        message: 'User found', existingUser,});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        message: 'Error: ' + err.message,
        error: 'Bad Request'
      });
    }
  }

  @Delete()
  async delete(@Res() response, @Query('username') username: string, @Query('userId') userId: string) {
    try {
      const deletedUser = await this.appService.delete(username, userId);
      if (deletedUser.deletedCount == 0) {
        throw new Error(`User ${username} cannot be deleted`);
      }
      return response.status(HttpStatus.OK).json({
        message: 'User has been deleted', deletedUser,});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 500,
        message: 'Error: ' + err.message,
        error: 'Bad Request'
      });
    }
  }

  @Put(':id')
  @UseInterceptors(ChangeTrackingInterceptor)
  async updateUser(@Res() response, @Param('id') userId: string, @Body() updateUserDto: any) {
    try {
      const updatedUser = await this.appService.update(userId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been updated', updatedUser,});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 500,
        message: 'Error: ' + err.message,
        error: 'Bad Request'
      });
    }
  }
}
