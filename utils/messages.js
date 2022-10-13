const ConflictErrorMessage = 'Пользователь с таким email уже существует';
const ValidationErrorMessage = 'Введены некорректные данные';
const CredentialsErrorMessage = 'Неправильные почта или пароль';
const NotFoundUserErrorMessage = 'Пользователь не найден';
const PageNotFoundErrorMessage = 'Страница не найдена';
const BadRequestErrorMessage = 'Неверный запрос';
const ForbiddenErrorMessage = 'У Вас нет прав на удаление этого фильма';
const NotFoundMovieErrorMessage = 'Фильм не найден';
const UnauthorizedErrorMessage = 'Необходима авторизация';
const CrashTestErrorMessage = 'Сервер сейчас упадёт';
const InternalServerErrorMessage = 'Внутренняя ошибка сервера';
const LogoutMessage = 'Сессия завершена';
const EmailValidatorErrorMessage = 'Неправильный формат почты';
const RateLimiterErrorMessage = 'Слишком много запросов с вашего IP, попробуйте повторить попытку позже';
const UrlValidatorMessage = 'Неправильная ссылка';
const NumberValidationMessage = 'Неправильный формат числового поля';
const IdValidationMessage = 'Неверный id';

module.exports = {
  ConflictErrorMessage,
  ValidationErrorMessage,
  CredentialsErrorMessage,
  NotFoundUserErrorMessage,
  PageNotFoundErrorMessage,
  BadRequestErrorMessage,
  ForbiddenErrorMessage,
  NotFoundMovieErrorMessage,
  UnauthorizedErrorMessage,
  CrashTestErrorMessage,
  InternalServerErrorMessage,
  LogoutMessage,
  EmailValidatorErrorMessage,
  RateLimiterErrorMessage,
  UrlValidatorMessage,
  NumberValidationMessage,
  IdValidationMessage,
};
