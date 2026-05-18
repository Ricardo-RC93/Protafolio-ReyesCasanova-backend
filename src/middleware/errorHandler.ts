import { Request, Response, NextFunction } from 'express';
import { ValidationError, UniqueConstraintError, DatabaseError } from 'sequelize';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err.stack);

  if (err instanceof UniqueConstraintError) {
    const field = err.errors?.[0]?.path || 'field';
    res.status(409).json({
      success: false,
      message: `Ya existe un registro con ese ${field}. Por favor usa un nombre diferente.`,
    });
    return;
  }

  if (err instanceof ValidationError) {
    const messages = err.errors.map((e) => e.message).join(', ');
    res.status(422).json({
      success: false,
      message: messages,
    });
    return;
  }

  if (err instanceof DatabaseError) {
    console.error('DatabaseError:', err.message);
    res.status(500).json({
      success: false,
      message: 'Error de base de datos: ' + err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
};
