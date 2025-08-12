import { 
    ExceptionFilter, 
    Catch, 
    ArgumentsHost, 
    HttpException, 
    HttpStatus 
} from '@nestjs/common'

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctxHttp = host.switchToHttp()
    const response = ctxHttp.getResponse()
    const request = ctxHttp.getRequest()

    const status = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const message = exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error'

    response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
    })
  }
}
