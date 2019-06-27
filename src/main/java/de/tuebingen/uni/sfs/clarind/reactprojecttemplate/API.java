package de.tuebingen.uni.sfs.clarind.reactprojecttemplate;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.tuebingen.uni.sfs.clarind.reactprojecttemplate.core.Splitter;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

@Path("/")
public class API {
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(API.class);

    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    Map<String, String> gitProperties;
    private Splitter splitter;

    public API(Map<String, String> gitProperties, Splitter splitter) {
        this.gitProperties = gitProperties;
        this.splitter = splitter;
    }

    @GET
    @Path("/info")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Map info() {
        Map map = new HashMap<String, Object>();
        map.put("git", gitProperties);
        map.put("version", gitProperties == null ? null : gitProperties.get("git.build.version"));
        try {
            InetAddress host = InetAddress.getLocalHost();
            map.put("host", new HashMap<String, String>() {{
                put("ip", host.getHostAddress());
                put("name", host.getHostName());
            }});
        } catch (UnknownHostException e) {
            // ignore
        }
        return map;
    }

    @POST
    @Path("/split")
    @Consumes(MediaType.MULTIPART_FORM_DATA + ";charset=utf-8")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response split(@FormDataParam("text") String text) {
        try {
            String[] tokens = splitter.split(text);
            Thread.sleep(10*1000);
            return Response.ok(tokens).build();
        } catch (Exception ex) {
            log.error("exception: ", ex);
            return Response.serverError().build();
        }
    }
}
