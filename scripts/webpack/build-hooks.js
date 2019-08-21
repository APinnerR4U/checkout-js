const { exec } = require('child_process');

class BuildHooks {
    apply(compiler) {
        if (process.env.WEBPACK_DONE) {
            compiler.hooks.done.tapPromise('BuildHooks', this.process(process.env.WEBPACK_DONE));
        }
    }

    process(command) {
        return () => new Promise((resolve, reject) => {
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                }

                if (stderr) {
                    reject(new Error(stderr));
                }

                const cleanOutput = stdout.trim();

                if (cleanOutput) {
                    console.log(cleanOutput.replace(/^/gm, '❯ '));
                }

                resolve();
            });
        });
    }
}

module.exports = BuildHooks;
