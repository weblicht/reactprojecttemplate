package de.tuebingen.uni.sfs.clarind.reactprojecttemplate;


import de.tuebingen.uni.sfs.clarind.reactprojecttemplate.core.Splitter;
import de.tuebingen.uni.sfs.clarind.reactprojecttemplate.health.AppHealthCheck;
import io.dropwizard.Configuration;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.server.session.SessionHandler;
import org.slf4j.LoggerFactory;

import java.net.URL;
import java.net.URLClassLoader;


public class Application extends io.dropwizard.Application<Configuration> {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) throws Exception {
        ClassLoader cl = ClassLoader.getSystemClassLoader();
        URL[] urls = ((URLClassLoader)cl).getURLs();
        System.out.println("classpath:");
        for(URL url: urls){
            System.out.println("\t"+url.getFile());
        }

       new Application().run(args);
    }

    @Override
    public void run(Configuration config, Environment env) {
        env.getApplicationContext().setSessionHandler(new SessionHandler());
        env.getApplicationContext().setErrorHandler(new HttpErrorHandler());

        env.jersey().setUrlPattern("/api/*");

        Splitter splitter = new Splitter();
        env.jersey().register(new API(splitter));

        env.healthChecks().register("reactprojecttemplate", new AppHealthCheck(splitter));

        log.info("reactprojecttemplate start");
    }

    @Override
    public void initialize(Bootstrap<Configuration> bootstrap) {
        bootstrap.addBundle(new AssetsBundle("/webui", "/", "index.html", "static"));
        bootstrap.setConfigurationSourceProvider(new SubstitutingSourceProvider(
                bootstrap.getConfigurationSourceProvider(), new EnvironmentVariableSubstitutor(false)));
    }
}
