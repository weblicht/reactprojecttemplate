package de.tuebingen.uni.sfs.clarind.reactprojecttemplate.health;

import com.codahale.metrics.health.HealthCheck;
import de.tuebingen.uni.sfs.clarind.reactprojecttemplate.core.Splitter;
import org.slf4j.LoggerFactory;

public class AppHealthCheck extends HealthCheck {
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(AppHealthCheck.class);

    private Splitter splitter;

    public AppHealthCheck(Splitter splitter) {
        this.splitter = splitter;
    }

    @Override
    public Result check() {
        try {
            String input = "This is a fine string example.";
            String[] result = splitter.split(input);
            return Result.healthy("Splitter test output: \n" + result);
        } catch (Exception ex) {
            log.error("exception while health checking: ", ex);
            ex.printStackTrace();
            return Result.unhealthy(ex.getMessage());
        }
    }
}
