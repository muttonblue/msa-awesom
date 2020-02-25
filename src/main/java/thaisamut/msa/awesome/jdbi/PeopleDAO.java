package thaisamut.msa.awesome.jdbi;

import org.apache.commons.lang3.StringUtils;
import org.jdbi.v3.sqlobject.CreateSqlObject;
import org.jdbi.v3.sqlobject.SqlObject;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.Define;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import thaisamut.msa.awesome.jdbi.entities.PeopleEntity;
import thaisamut.msa.framework.annotations.JDBIDao;
import java.util.List;

@JDBIDao//TODO: เป็น annotation ประกาศว่า class นี้จะใช้ JDBI
@RegisterBeanMapper(PeopleEntity.class)//TODO: เป็น annotation ในการ map data กับ Class
public interface PeopleDAO extends SqlObject {

    @SqlQuery("select * from people where id = :id")
    PeopleEntity findById(@Bind("id") Long id);

    @SqlUpdate("insert into people (full_name, job_title) values ( :fullName, :jobTitle) ")
    @GetGeneratedKeys//TODO: เป็น annotation ให้ jdbi return ค่า value ใน database กลับมา
    PeopleEntity insert(@Bind("fullName") String fullName, @Bind("jobTitle") String jobTitle);

    @SqlUpdate("insert into people (id, full_name, job_title) values (:id, :fullName, :jobTitle) ")
    @GetGeneratedKeys
    PeopleEntity insert(@Bind("id") Long id, @Bind("fullName") String fullName, @Bind("jobTitle") String jobTitle);

    @SqlUpdate("update people set full_name = :fullName where id = :id")
    @GetGeneratedKeys
    PeopleEntity update(@Bind("fullName") String status, @Bind("id") Long id);

    @SqlUpdate("update people set full_name = :fullName, job_title = :jobTitle where id = :id")
    @GetGeneratedKeys
    PeopleEntity update(@Bind("fullName") String fullname, @Bind("jobTitle") String jobTitle, @Bind("id") Long id);

    @SqlUpdate("delete from people where id = :id")
    int delete(Long id);

    @SqlQuery("<sql>")
    List<PeopleEntity> findQuery(@Define("sql") String sql);

    default List<PeopleEntity> find(PeopleEntity criteria) {
        return withHandle(handle -> { //TODO: withHandle ใช้ใน กรณีที่ต้องการ retuen

            StringBuilder sql = new StringBuilder();
            sql.append("SELECT * FROM people ");
            sql.append("WHERE 1=1 ");

            if (criteria.getId() != null) {
                sql.append("and id = ").append(criteria.getId());
            }

            if (StringUtils.isNotBlank(criteria.getFullName())) {
                sql.append("and full_name like '%").append(criteria.getFullName()).append("%' ");
            }

            if (StringUtils.isNotBlank(criteria.getJobTitle())) {
                sql.append("and job_title like '%").append(criteria.getJobTitle()).append("%' ");
            }

            return handle.createQuery(sql.toString())
                    .mapToBean(PeopleEntity.class)
                    .list();
        });
    }

    default PeopleEntity update(PeopleEntity people) {
        return withHandle(handle -> { // TODO: withHandle
            PeopleEntity _people = this.findById(people.getId());
            peopleHistoryDAO().insert(_people);
            return this.update(people.getFullName(), people.getJobTitle(), people.getId());
        });
    }

    @CreateSqlObject
    PeopleHistoryDAO peopleHistoryDAO();
}
