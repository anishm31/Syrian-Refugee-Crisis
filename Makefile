.DEFAULT_GOAL := all
SHELL         :=  bash

run:
	echo "Launching the application on localhost..."
	npm start
	echo "Successfully launched the application"

install:
	npm install

clean:
	echo "Clearing the build folder, node modules, and any temporary files..."
	rm -rf build/
	rm -rf node_modules/
	rm -f  *.tmp

pull:
	make clean
	@echo
	git pull
	git status

build:
	echo "Building and running the application for CI/CD..."
	npm run build
	echo "Completed Build"