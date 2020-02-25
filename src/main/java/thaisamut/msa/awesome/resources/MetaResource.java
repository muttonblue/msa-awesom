package thaisamut.msa.awesome.resources;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(title = "ระบบงาน Sample", version = "msa-awesome#0.0.1"),
        externalDocs = @ExternalDocumentation(description = "==== [Download YAML] ====", url = "/openapi.yaml"),
        security = {
                @SecurityRequirement(name = "req 1", scopes = {"a", "b"}),
                @SecurityRequirement(name = "req 2", scopes = {"b", "c"})
        },
        servers = {
                @Server(
                        description = "current-server",
                        url = "/"
                )
        }
)
public class MetaResource {
}
