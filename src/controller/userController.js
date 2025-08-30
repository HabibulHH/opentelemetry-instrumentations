const { trace, SpanStatusCode } = require('@opentelemetry/api');
const { SemanticAttributes } = require('@opentelemetry/semantic-conventions');
const userService = require('../services/userService');
const logger = require('../config/logger');

class userController {
    async createUser(req, res, next) {
        const tracer = trace.getTracer('user-service');
        return tracer.startActiveSpan('createUser', async (span) => {
            try {
                span.setAttribute(SemanticAttributes.HTTP_METHOD, 'POST');
                span.setAttribute(SemanticAttributes.HTTP_ROUTE, '/api/users');
                span.addEvent('User creation started');
                const user = await userService.createUser(req.body);
                span.setAttribute('app.user.id', user.id)
                span.setAttribute(SemanticAttributes.HTTP_STATUS_CODE, 201);
                span.addEvent('User creation completed', {
                    'app.user.id': user.id
                });
                //logger
                logger.info(`User created: ${user.id}`, {
                    traceID: span.spanContext().traceID,
                    userID: user.id
                });
                res.status(201).json(user);

            } catch (error) {
                logger.error('Error creating user:', {
                    error: error.message,
                    traceId: span.spanContext().traceId,
                    userID: req.body.id || 'unknown'
                });
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: error.message,
                });
                span.recordException(error);
                next(error);
            } finally {
                span.end();
            }
        });
    }
    async updateUser(req, res, next) {
        const tracer = trace.getTracer('user-service');
        return tracer.startActiveSpan('updateUser', async (span) => {
            try{
                span.setAttribute(SemanticAttributes.HTTP_METHOD, 'PUT');
                span.setAttribute(SemanticAttributes.HTTP_ROUTE, '/api/users/:id');
                span.setAttribute('app.user.id', req.params.id);
                span.addEvent('User update started');
                const user = await userService.updateUser(req.params.id, req.body);
                span.setAttribute(SemanticAttributes.HTTP_STATUS_CODE, 200);

                logger.info(`User updated: ${req.params.id}`, {
                    traceId: span.spanContext().traceId,
                    userId: req.params.id
                  });
                  res.json(user);
                  
            } catch(error){
                logger.error('Error updating user:', {
                    error: error.message,
                    traceId: span.spanContext().traceId,
                    userId: req.params.id
                });
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: error.message,
                });
            }finally{
                span.end()
            }
            
        })
    }

    async deleteUser(req,res,next){

        const tracer = trace.getTracer('user-service');
        return tracer.startActiveSpan('deleteUser', async (span) => {
            try{
                span.setAttribute(SemanticAttributes.HTTP_METHOD, 'DELETE');
                span.setAttribute(SemanticAttributes.HTTP_ROUTE, '/api/users/:id');
                span.setAttribute('app.user.id', req.params.id);
                await userService.deleteUser(req.params.id);
                span.setAttribute(SemanticAttributes.HTTP_STATUS_CODE, 204);
                logger.info(`User deleted: ${req.params.id}`, {
                    traceId: span.spanContext().traceId,
                    userId: req.params.id
                });
                res.status(204).send();

            }
            catch(error){
                logger.error('Error deleting user:', {
                    error: error.message,
                    traceId: span.spanContext().traceId,
                    userId: req.params.id
                });
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: error.message,
                });
                span.recordException(error);
                next(error);
            }
            finally{
                span.end();
            }
        })

    }
    
    async getAllUsers(req, res, next) {
        const tracer = trace.getTracer('user-service');
        return tracer.startActiveSpan('getAllUsers', async (span) => {
          try {
            span.setAttribute(SemanticAttributes.HTTP_METHOD, 'GET');
            span.setAttribute(SemanticAttributes.HTTP_ROUTE, '/api/users');
    
            const users = await userService.getAllUsers();
    
            span.setAttribute(SemanticAttributes.HTTP_STATUS_CODE, 200);
            span.setAttribute('app.users.count', users.length);
            logger.info('Retrieved all users', {
              traceId: span.spanContext().traceId,
              userCount: users.length
            });
            res.json(users);
          } catch (error) {
            logger.error('Error getting all users:', {
              error: error.message,
              traceId: span.spanContext().traceId
            });
            span.setStatus({
              code: SpanStatusCode.ERROR,
              message: error.message,
            });
            span.recordException(error);
            next(error);
          } finally {
            span.end();
          }
        });
      }
    
}
module.exports = new userController();