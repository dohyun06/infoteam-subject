import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { GetUserDTO } from './dto/getUser.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { HttpExceptionFilter } from 'filter/http-exception.filter';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'create a user' })
  @ApiBody({ type: CreateUserDTO })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async registerUser(@Body() body: CreateUserDTO): Promise<CreateUserDTO> {
    return await this.userService.registerUser(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a user' })
  @ApiOkResponse({ type: CreateUserDTO, description: 'Return a user' })
  @ApiParam({ name: 'id', description: 'id of a user', type: GetUserDTO })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getUser(@Param() { id }: GetUserDTO): Promise<CreateUserDTO> {
    return await this.userService.getUser(id);
  }

  @Patch(':id/password')
  @ApiOperation({ summary: 'edit password of a user' })
  @ApiParam({ name: 'id', description: 'id of a user', type: GetUserDTO })
  @ApiBody({ type: ChangePasswordDTO })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async changePassword(
    @Param() { id }: GetUserDTO,
    @Body() { password }: ChangePasswordDTO,
  ): Promise<CreateUserDTO> {
    return await this.userService.changePassword(id, password);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'edit password of a user' })
  @ApiParam({ name: 'id', description: 'id of a user', type: GetUserDTO })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async deleteUser(@Param() { id }: GetUserDTO): Promise<CreateUserDTO> {
    return await this.userService.deleteUser(id);
  }
}
