# OkPi
Speech assistant with offline voice recognition for Raspberry Pi.

## Installation
* The PocketSphinx installation currently requires Node.js 6
	* This can be achieved by using a version manager such as [nvm](https://github.com/creationix/nvm):
		* `nvm install 6`
* Install the [PocketSphinx](https://github.com/cmusphinx/node-pocketsphinx) [dependencies](https://github.com/cmusphinx/node-pocketsphinx#installation):
	* `apt-get install cmake pkg-config libpcre3-dev bison`
	* [`swig` from GitHub](https://github.com/swig/swig)
	* [`sphinxbase` from GitHub](https://github.com/cmusphinx/sphinxbase)
	* [`pocketsphinx` from GitHub](https://github.com/cmusphinx/pocketsphinx)
	* Note that certain tweaks might be required prior to install:
		* `export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig`
		* `ln -s /usr/bin/swig3.0 /usr/bin/swig` (Create a symlink for `swig3.0`)
	* `npm install cmake-js -g`