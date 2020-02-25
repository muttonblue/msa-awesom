package thaisamut.msa.awesome.resources;

import org.springframework.beans.factory.annotation.Autowired;
import thaisamut.msa.framework.view.OLIIndexView;
import thaisamut.msa.framework.dw.BaseApplicationConfiguration;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Arrays;
import java.util.List;

@Path("/thaisamut/web/awesome/index.html")
@Produces(MediaType.TEXT_HTML)
public class ReactIndexPage {

    @Autowired
    private BaseApplicationConfiguration appConfig;

    private final String[] provideConfKeys = {
            "msa.web.basepath.nbsportal",
            "msa.web.basepath.awesome"
    };

    @GET
    public OLIIndexView index() {
        return new OLIIndexView(appConfig) {
            @Override
            protected List<String> provideConfKeys() {
                return Arrays.asList(provideConfKeys);
            }
        };
    }
}
