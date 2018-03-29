package de.tuebingen.uni.sfs.clarind.reactprojecttemplate;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.tuebingen.uni.sfs.clarind.reactprojecttemplate.core.Splitter;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/")
public class API {
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(API.class);
    private static final String API_VERSION = "0.1.0";

    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    private Splitter splitter;

    public API(Splitter engine) {
        this.splitter = splitter;
    }

    @GET
    @Path("/info")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Map info() {
        Map<String, String> info = new HashMap<>();
        info.put("version", API_VERSION);
        return info;
    }

    @POST
    @Path("/split")
    @Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response split(String inputString) {
        try {
            JobInput in = gson.fromJson(inputString, JobInput.class);
            String[] tokens = splitter.split(in.data);
            JobOutput out = new JobOutput();
            out.data = tokens;
            return Response.ok(out).build();
        } catch (Exception ex) {
            log.error("exception: ", ex);
            return Response.serverError().build();
        }
    }

    class JobInput {
        String data;
    }

    class JobOutput {
        String[] data;
    }
}
