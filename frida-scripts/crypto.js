'use strict;'

if (Java.available) {
  Java.perform(function() {
    const Cipher = Java.use('javax.crypto.Cipher');

		const AndroidKeyStoreKey = Java.use('android.security.keystore.AndroidKeyStoreKey');
		//const AndroidKeyStoreRSAPublicKey = Java.use('android.security.keystore.AndroidKeyStoreRSAPublicKey');
		const AndroidKeyStoreRSAPrivateKey = Java.use('android.security.keystore.AndroidKeyStoreRSAPrivateKey');
    const AndroidKeyStoreProvider = Java.use('android.security.keystore.AndroidKeyStoreProvider');
		//const KeyFactory = Java.use('java.security.KeyFactory');
		//const KeyInfo = Java.use('android.security.keystore.KeyInfo'); 

		Cipher.init.overload('int', 'java.security.Key').implementation = function (opmode, key) {
      var args = [];
      var details = [];
      var algo = this.getAlgorithm();

      args.push({'name': 'opmode', 'value': opmode});
      args.push({'name': 'key', 'value': key.$className});

      details.push({'name': 'key', 'value': algo });

      console.log(key.$className);

			if (key.$className === 'android.security.keystore.AndroidKeyStoreRSAPrivateKey') {
        console.log('its a private key');
				var priv_key = Java.cast(key, AndroidKeyStoreRSAPrivateKey);
        console.log(priv_key);
				var factory = KeyFactory.getInstance(key.getAlgorithm(), "AndroidKeyStore");
				var keyInfo = Java.cast(factory.getKeySpec(key, KeyInfo.class), KeyInfo);
				//details.push({'name': 'keyInfo.getKeystoreAlias()', 'value': keyInfo.getKeystoreAlias()});
				//details.push({'name': 'keyInfo.getKeySize()', 'value': keyInfo.getKeySize().toString()});
				//details.push({'name': 'keyInfo.isInsideSecureHardware()', 'value': keyInfo.isInsideSecureHardware().toString()});
				//details.push({'name': 'key.getModulus()', 'value': priv_key.getModulus().toString()});
			} 

      var send_message = {
        'method' : 'javax.crypto.Cipher.init',
        'args': args,
        'details': details
      };

      send(send_message);

			this.init.overload('int', 'java.security.Key').call(this, opmode, key);
		} 
  }
)}

