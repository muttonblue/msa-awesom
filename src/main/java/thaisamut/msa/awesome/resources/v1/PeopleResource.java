package thaisamut.msa.awesome.resources.v1;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import thaisamut.msa.awesome.api.v1.People;
import thaisamut.msa.awesome.components.PeopleService;
import thaisamut.msa.awesome.core.models.PeopleDTO;
import thaisamut.msa.awesome.jdbi.PeopleDAO;
import thaisamut.msa.awesome.jdbi.entities.PeopleEntity;
import thaisamut.msa.framework.security.AuthInfo;
import thaisamut.msa.framework.security.RolesAllowed;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("thaisamut/rs/awesome/v1/people")
@Tag(name = "awesome")
public class PeopleResource {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private PeopleDAO peopleDao;

    @Autowired
    private PeopleService peopleService;

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes({MediaType.APPLICATION_JSON})
    @RolesAllowed(roles = {RolesAllowed.ROLES.INTRANET})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "พบข้อมูล"),
            @ApiResponse(responseCode = "204", description = "ไม่พบข้อมูล"),
    })
    @Operation(summary = "ดึงข้อมูล people ตาม ID", description = "ตัวอย่าง http method GET")
    public People getById(
            @Context final AuthInfo authInfo,
            @Context final HttpServletResponse response,
            @Parameter(description = "id")
            @QueryParam("id") Long id
    ) {
        PeopleEntity entity = peopleDao.findById(id);

        if (entity == null) {
            throw new WebApplicationException(
                    Response.status(Response.Status.NO_CONTENT)
                            .entity("ไม่พบข้อมูล").build());
        }

        People people = new People();
        BeanUtils.copyProperties(entity, people);

        return people;
    }

    @GET
    @Path("/count")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes({MediaType.APPLICATION_JSON})
    @RolesAllowed(roles = {RolesAllowed.ROLES.INTRANET})
    @Operation(summary = "ดึงจำนวน people ทั้งหมด", description = "ตัวอย่าง http method GET")
    public int count(
            @Context final AuthInfo authInfo,
            @Context final HttpServletRequest request,
            @Context final HttpServletResponse response
    ) {
        List<PeopleEntity> list = peopleService.getAll();
        return CollectionUtils.isEmpty(list) ? 0 : list.size();
    }

    @GET
    @Path("/{id}/address")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes({MediaType.APPLICATION_JSON})
    @RolesAllowed(roles = {RolesAllowed.ROLES.INTRANET})
    @Operation(summary = "ดึง Address ของ people", description = "ตัวอย่าง http method GET")
    public List<PeopleDTO> getAddress(
            @Context final AuthInfo authInfo,
            @Context final HttpServletRequest request,
            @Context final HttpServletResponse response,
            @PathParam("id") Long id
    ) {
        List<PeopleDTO> list = peopleService.getAddress(id);
        return list;
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes({MediaType.APPLICATION_JSON})
    @RolesAllowed(roles = {RolesAllowed.ROLES.INTRANET})
    public List<People> search(
            @Context AuthInfo authInfo,
            @Parameter(description = "id")
            @QueryParam("id") Integer id,
            @Parameter(description = "ชื่อ-นามสกุล")
            @QueryParam("fullName") String fullName,
            @Parameter(description = "อายุ")
            @QueryParam("age") Integer age,
            @QueryParam("sort") String sort,
            @QueryParam("rowPerPage") Integer rowPerPage,
            @QueryParam("page") Integer page
    ) {
        PeopleEntity criteria = new PeopleEntity();
        List<PeopleEntity> list = peopleDao.find(criteria);

        List<People> out = new ArrayList<>();
        People bean;

        if (CollectionUtils.isEmpty(list))
            return new ArrayList<>(0);

        for (PeopleEntity entity : list) {
            bean = new People();
            BeanUtils.copyProperties(entity, bean);
            out.add(bean);
        }

        log.info(" {} ", list);
        return out;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes({MediaType.APPLICATION_JSON})
    @Operation(summary = "บันทึกข้อมูล people", description = "ตัวอย่าง http method POST")
    @RolesAllowed(roles = {RolesAllowed.ROLES.INTRANET})
    public People add(
            @RequestBody(required = true) People people
    ) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();

        String json = mapper.writeValueAsString(people);
        log.info("input : {}", json);

        PeopleEntity entity = peopleDao.insert(people.getFullName(), people.getJobTitle());

        log.info("entity : {}", mapper.writeValueAsString(entity));

        return people;
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes({MediaType.APPLICATION_JSON})
    @Operation(
            summary = "แก้ไขข้อมูล people",
            description = "ตัวอย่าง http method PUT"
    )
    @RolesAllowed(roles = {RolesAllowed.ROLES.INTRANET})
    public void update(@RequestBody(required = true) People people) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(people);
        log.info(" INPUT :: {}", json);

        PeopleEntity entity = new PeopleEntity();

        entity.setId(people.getId());
        entity.setFullName(people.getFullName());
        entity.setJobTitle(people.getJobTitle());

        PeopleEntity e = peopleDao.update(entity);

        log.info("PeopleEntity => {}", mapper.writeValueAsString(e));
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes({MediaType.APPLICATION_JSON})
    @Operation(summary = "ลบข้อมูล people", description = "ตัวอย่าง http method DELETE")
    @RolesAllowed(roles = {RolesAllowed.ROLES.INTRANET})
    public void delete(@PathParam("id") Long id) {
        log.info("delete id : {} ", id);
        peopleDao.delete(id);
    }
}
