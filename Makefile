WEBUIAPP=src/main/resources/webui
JAR=target/reactprojecttemplate-0.1.0-SNAPSHOT.jar

webui:
	(cd webui && node_modules/webpack/bin/webpack.js --config webpack.config.devel.js -dw)

webui-production:
	(cd webui && node_modules/webpack/bin/webpack.js --config webpack.config.js -p)

dependencies:
	(cd webui && npm install)

clean:
	rm -rf webui/node_modules
	rm -f $(WEBUIAPP)/bundle.js*

run:
	mvn -q package
	CLASSPATH_PREFIX=src/main/resources  target/appassembler/bin/reactprojecttemplate server reactprojecttemplate.yaml

.PHONY: webui webui-production dependencies clean backend
