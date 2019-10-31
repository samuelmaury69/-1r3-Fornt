# # Sirena Integracion

From node:10-stretch
#From samuelmaury/react_base
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

#Cambiar directorio de trabajo
WORKDIR /home/node/app

# Configurar directorio para usar npm global con usuario node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# optionally if you want to run npm global bin without specifying path
ENV PATH=$PATH:/home/node/.npm-global/bin

# Actualizar repositorios
RUN apt update

# Actualizar repositorios
RUN apt upgrade -y

# Instalar software extra
RUN apt install -y git vim

USER node

# Instalar expo
RUN npm install -g expo-cli

# Intalar exp (generar apk y IOS)
RUN npm install -g exp


