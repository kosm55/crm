import css from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <div className={css.Error}>
      <img src="/404.svg" alt="404" />
    </div>
  );
};

export { ErrorPage };
