
# setting up ipfs on dev machine

The setup folder contains utility bash scripts for setting up IPFS on a dev machine. 
- Create a .env file under setup folder
* cd into setup folder and create a .env file and copy content from env.example file and ensure to adjust the CUSTOM_IPFS_PATH to match your local working directory.
- Download and install
* cd into setup folder and execute the install bash script
```bash
./0_install-ipfs.sh
```
- Initialize an instance of the IPFS
```bash
./1_init-ipfs.sh
```
- After the setup is complete, you can start the ipfs daemon with the following command:
```bash
./3_operate_daemon.sh start
```
- To stop ipfs daemon use the command:
```bash
./3_operate_daemon.sh stop
```
- On private mode, the default UI path doesn't work as expected instead we will use the custom deployed UI on the following path 
```
http://127.0.0.1:8080/ipfs/Qma3H1mV9eShPSzbL74WwUFTJes8YN517JizdetSGrMZR3/#/
```
