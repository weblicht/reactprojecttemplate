WEBUIAPP=src/main/resources/webui

# customize this variable before running make init:
PROJECTNAME=reactprojecttemplate

init:
	./bin/rename.sh $(PROJECTNAME)

webui:
	(cd webui && node_modules/webpack-dev-server/bin/webpack-dev-server.js --mode development -d --hot --https)

webui-production:
	(cd webui && node_modules/webpack/bin/webpack.js --mode production -p)

dependencies: clean
	(cd webui && npm install)

clean:
	rm -rf webui/node_modules
	rm -f $(WEBUIAPP)/bundle.js*
	mvn clean

run:
	mvn -q package
	JAVA_OPTS="-Xmx2g" target/appassembler/bin/reactprojecttemplate server reactprojecttemplate.yaml

.PHONY: webui webui-production dependencies clean run
