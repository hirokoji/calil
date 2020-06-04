import { program }from 'commander';

export class Cli{

    constructor() {
    }

    public cli = async (argv: any) => {

        program
            .command('list')
            .description('list greengrass group')
            .action(async (cmd) => {
                console.log('will list greengrass here')
            });

        program.parse(argv);

    };
}