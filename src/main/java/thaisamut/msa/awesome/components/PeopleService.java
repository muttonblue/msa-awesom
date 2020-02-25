package thaisamut.msa.awesome.components;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.JoinRow;
import org.jdbi.v3.core.mapper.JoinRowMapper;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import thaisamut.msa.awesome.core.models.PeopleDTO;
import thaisamut.msa.awesome.jdbi.entities.PeopleEntity;
import thaisamut.msa.awesome.jdbi.entities.PeopleHistoryEntity;

import java.util.List;

@Component
public class PeopleService {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private Jdbi jdbi;

    @RegisterBeanMapper(PeopleEntity.class)
    public List<PeopleEntity> getAll() {
        return jdbi.withHandle(handle -> {
            List<PeopleEntity> peoples =
                    handle.createQuery("select * from people ")
                            .mapToBean(PeopleEntity.class) //<= mapToBean ใช้ตัวนี้ช่วย map object
                            .list();
            return peoples;
        });
    }

    //TODO: การใช้ Jdbi ดึงข้อมูล complex query
    @RegisterBeanMapper(PeopleDTO.class)
    public List<PeopleDTO> getAddress(Long id) {
        return jdbi.withHandle(handle -> {
            StringBuilder sql = new StringBuilder();

            sql.append("SELECT ");
            sql.append("p.id people_id, p.full_name, p.job_title, ");
            sql.append("a.street, a.city, a.state, a.zip ");
            sql.append("FROM people p ");
            sql.append("LEFT JOIN contacts c on c.people_id = p.id ");
            sql.append("LEFT JOIN address a on a.id = c.address_id ");
            sql.append("WHERE p.id = :id ");

            List<PeopleDTO> peoples = handle.createQuery(sql.toString())
                    .bind("id", id)
                    .mapToBean(PeopleDTO.class) //<= mapToBean ใช้ตัวนี้ช่วย map object (เป็นการ map จาก snake_case -> camelCase)
                    .list();

            return peoples;
        });
    }

    public List<String> getJobTitles() {
        List<String> jobTitles = jdbi.withHandle(handle ->
                handle.createQuery("select job_title from people")
                        .mapTo(String.class)
                        .list());
        return jobTitles;
    }

    public long countHistory(final Long id) {
        Long jobTitles = jdbi.withHandle(handle ->
                handle.createQuery("select count(1) from people_history")
                        .mapTo(Long.class) //<= mapTo ใช้ตัวนี้ช่วย map แบบเลือก column
                        .findFirst().get()
        );
        return jobTitles;
    }


    public void getPeople() {
        jdbi.useHandle(handle -> {
            handle.registerRowMapper(ConstructorMapper.factory(PeopleEntity.class, "c"));
            handle.registerRowMapper(ConstructorMapper.factory(PeopleHistoryEntity.class, "p"));
            handle.registerRowMapper(JoinRowMapper.forTypes(PeopleEntity.class, PeopleHistoryEntity.class));

            List<JoinRow> peopleHis = handle.select("select " +
                    "c.id c_id, c.full_name c_full_name, c.job_title c_job_title, " +
                    "p.id pid, p.full_name p_full_name, p.job_title p_jobtitle, p.create_by p_create_by " +
                    "from people c left join people_history p on c.id = p.id")
                    .mapTo(JoinRow.class)
                    .list();

            log.info(">>> {}", peopleHis);
        });
    }

}
