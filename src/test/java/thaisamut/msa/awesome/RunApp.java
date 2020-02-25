package thaisamut.msa.awesome;

import org.junit.Test;

public class RunApp {

    @Test
    public void run() throws Exception {
        System.setProperty("DW_HOME", System.getProperty("java.io.tmpdir"));
        System.setProperty("devMode", "true");
        new AwesomeApplication().run("server", "config/dev.yml");

        final Object obj = new Object();

        synchronized (obj) {
            obj.wait();
        }
    }
}
