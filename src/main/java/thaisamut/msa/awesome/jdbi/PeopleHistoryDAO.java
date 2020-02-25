package thaisamut.msa.awesome.jdbi;

import org.jdbi.v3.sqlobject.SqlObject;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import thaisamut.msa.awesome.jdbi.entities.PeopleEntity;
import thaisamut.msa.awesome.jdbi.entities.PeopleHistoryEntity;
import thaisamut.msa.framework.annotations.JDBIDao;

import java.util.Date;

@JDBIDao
@RegisterBeanMapper(PeopleHistoryEntity.class)
public interface PeopleHistoryDAO extends SqlObject {

    default void insert(final PeopleEntity people) {
        useHandle(handle -> {//TODO: useHandle ถ้าไม่การ return ค่า
            if (people == null)
                return;

            this.insert(people.getFullName(), people.getJobTitle(), "admin", new Date());
        });
    }

    @SqlUpdate("insert into people_history (full_name, job_title, create_by, create_date) values ( :fullName, :jobTitle, :createBy, :createDate ) ")
    @GetGeneratedKeys
    PeopleHistoryEntity insert(
            @Bind("fullName") String fullName,
            @Bind("jobTitle") String jobTitle,
            String createBy, Date createDate
    );


}
