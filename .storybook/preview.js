/* -------- Load Styles --------- */
import 'bootstrap/dist/css/bootstrap.min.css'; // Can be replace with other style framework
import 'public/sass/style.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
