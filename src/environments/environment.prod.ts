import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'http://localhost:4200',
  firebaseConfig: {
    apiKey: 'AIzaSyAC7eZ5vKURIZnZUe3WETLouIQC_P_ul_8',
    authDomain: 'autotrendsvizag.firebaseapp.com',
    projectId: 'autotrendsvizag',
    storageBucket: 'autotrendsvizag.appspot.com',
    messagingSenderId: '105842478880',
    appId: '1:105842478880:web:4b2008d59d0647c17ed145'
  }
};
