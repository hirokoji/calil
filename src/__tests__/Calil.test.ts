import { Calil, BookStatus } from '../Calil';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';

describe('Calil test', () => {
  describe('check API', () => {
    it(`should return {libraryName:'青県図' , status: '貸出可'}`, async () => {
      const calil = new Calil(`SECRET_KEY`);

      const isbn = '4834000826';
      const library = 'Aomori_Pref';
      const statusList = await calil.checkBookAvailability(isbn, library);
      expect(statusList).toEqual([{ libraryName: '青県図', status: '貸出可' }]);
    });
  });
});
