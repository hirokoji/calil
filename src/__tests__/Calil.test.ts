import {Calil, BookStatus} from '../Calil';
import * as config from '../../config.json';

describe('Calil test', () => {


    describe('check API', () => {
        it(`should return {libraryName:'青県図' , status: '貸出可'}`, async () => {
            const calil = new Calil(config.SECRET_KEY);

            const isbn = '4834000826';
            const library = 'Aomori_Pref';
            const statusList = await calil.check(isbn, library);
            if(!(statusList instanceof Error)){
                expect(statusList[0]).toEqual({libraryName:'青県図' , status: '貸出可'});
            }
        });
    });

});