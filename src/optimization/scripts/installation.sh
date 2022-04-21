sudo apt-get update
sudo apt-get upgrade
sudo add-apt-repository ppa:marutter/rrutter4.0
wget ca-certificates lsb-release software-properties-common
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
sudo apt-get install -y cmake libcurl4-openssl-dev libssl-dev libxml2-dev libcurl4-gnutls-dev r-cran-devtools libfontconfig1-dev emacs unzip gnupg2 r-base r-cran-tidyverse r-cran-qpdf r-cran-batchtools r-cran-rvest r-cran-plyr r-cran-shinythemes r-cran-igraph r-cran-randomforest

# Estos comandos serían para clonar el repositorio e instalar toda el paquete de babsim hospital en local,
# para evitar asi reinstalarlo en cada ejecución

# git clone http://owos.gm.fh-koeln.de:8055/bartz/babsim.hospital.git babsim
# Rscript -e ".libPaths()" # Con este veríamos cual es la ruta de instalación de R 
# sudo R CMD INSTALL -l ruta_de_R babsim/babsim.hospital_11.8.0.tar.gz 