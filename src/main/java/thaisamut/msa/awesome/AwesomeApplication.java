package thaisamut.msa.awesome;

import io.dropwizard.setup.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import thaisamut.msa.framework.dw.BaseApplication;

public class AwesomeApplication extends BaseApplication<AwesomeConfiguration> {

    private static final Logger log = LoggerFactory.getLogger(AwesomeApplication.class);

    public static void main(final String[] args) throws Exception {
        new AwesomeApplication().run(args);
    }

    @Override
    public void runApp(AwesomeConfiguration configuration, Environment environment,
            AnnotationConfigApplicationContext ctx) throws Exception {
        //using default
    }

}
