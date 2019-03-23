# Lotery - BackEnd

## Instalación

Únicamente es necesario instalar las dependencias:

`$npm install`

## Requerimientos

Antes de proceder a la ejecución, es necesario crear un fichero `.env` en la raíz y configurar una serie de variables que se toman como variables de entorno en las ejecuciones:

```
ACCESS_POINT = "https://rinkeby.infura.io...."
PRIVATE_KEY = <clave_privada_con_0x>
PRIVATE_KEY_2 = <clave_privada_sin_0x>
ABI_DEFINITION = '[{"constant":false,"i...'
CONTRACT_ADDR = '0x90bf...'
```

Se ha configurado la aplicación para ejecución en dispositivos ligeros, para ello se ha elegido como `Access_point` a la red a través de Infura, evitando la necesidad de tener actualizado un nodo completo con herramientas como `geth` o `parity`

## Funcionalidad

Se facilitan dos scripts:

- `index.js` —> Realiza la ejecución de la lotería actual en juego. Aunque esta funcionalidad está habilitada en el front, también se facilita el código para el back, para posible automatización requerida por el usuario. Para su ejecución: `$ node index.js`
- `index_newLottery.js`—> Crea la nueva lotería en juego. Esta aplicación está pensada para su programación en `cron`. Para su ejecución: `$node index_newLottery.js`









