import { Calil, BookStatus } from '../Calil';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';

jest.mock('axios');

describe('Calil test', () => {
  describe('check API', () => {
    it(`should return {libraryName:'青県図' , status: '貸出可'}`, async () => {
      const calil = new Calil(`SECRET_KEY`);

      const isbn = '4834000826';
      const library = 'Aomori_Pref';
      const statusList = await calil.checkBookAvailability(isbn, library);
      if (!(statusList instanceof Error)) {
        expect(statusList).toEqual([{ libraryName: '青県図', status: '貸出可' }]);
      }
    });

    it(`should return error`, async () => {
      const errorResponse = {
        data: {
          session: '89615da6c4ab2ab9555f1e51241765e7',
          continue: 1,
          books: { '4834000826': { Aichi_Nagoya: { status: 'Running', reserveurl: '' } } }
        },
        status: 200
      };

      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.get.mockResolvedValue(errorResponse);

      const calil = new Calil(`SECRET_KEY`);

      const isbn = '4834000826';
      const library = 'Aomori_Pref';
      const response = await calil.checkBookAvailability(isbn, library);
      console.log(response);
    });
  });
});
