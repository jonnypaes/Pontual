#!/bin/bash

$container="web"
$dbPath="db"
$dbName="mysql"
$dbVersion="5.7"
$appName="pontual-app"
$appVersion="1.0"

while ($true) {
    Clear-Host
    Write-Host "Opcoes do docker:"
    Write-Host "1 - Compose Up"
    Write-Host "2 - Boot"
    Write-Host "3 - Stop"
    Write-Host "4 - MySQL"
    Write-Host "5 - Images"
	Write-Host "6 - Build"
	Write-Host "7 - Run"
	Write-Host "8 - Purge"
	Write-Host "9 - All"
    Write-Host "0 - Exit"
    
    $choice = Read-Host "Escolha: "

    $message = ""

    switch ($choice) {
        1 {
            # Compose Up
            docker-compose up -d
            break
			docker restart db
        }
        2 {
            # Docker Start
			docker start "$container" 
            docker start "$dbPath"
			#docker run -e MY_SQL_ROOT_PASSWORD=mudar123 --name banco -d -p 3306:3306 mysql:5.7
            break
        }
        3 {
            # Stop
            docker stop "$container", "$dbPath"
            break
        }
        4 {
            # MySQL
            Write-Host "Senha: mudar123"
            docker exec -it "$dbPath" mysql --host=localhost -u root -p
            break
        }
        5 {
          docker images
        }
		6 {           
		  docker-compose build -t pontual-app:1.0
        }
		7 {
          docker run --name pontual-app:1.0 -e MYSQL_ROOT_HOST=% -e MYSQL_ROOT_PASSWORD=mudar123 -d mysql:$dbVersion
		}
		8 {
          docker system prune --all
		}
		9 {
          docker network create MyNetwork
		  docker build -t pontual-app:1.0 .
		  docker run --name pontual-app:1.0 -e MYSQL_ROOT_HOST=% -e MYSQL_ROOT_PASSWORD=mudar123 -d mysql:$dbVersion
		  docker run --name pontual-db --network MyNetwork -e MYSQL_ROOT_PASSWORD=mudar123 -d mysql:5.7
		  docker run --name pontual-web --network MyNetwork -d pontual-app:1.0
		}		
		0 {
         # Exit the script
         exit
        }
        default {
          $message = "Invalid choice, please try again."
        }
    }

    Write-Host ""
    Write-Host $message
    Pause
}
