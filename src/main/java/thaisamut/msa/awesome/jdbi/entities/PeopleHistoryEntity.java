package thaisamut.msa.awesome.jdbi.entities;

import org.jdbi.v3.core.mapper.reflect.ColumnName;
import org.jdbi.v3.core.mapper.reflect.JdbiConstructor;

import javax.annotation.Nullable;
import java.util.Date;

public class PeopleHistoryEntity {

    private Long id;
    private String peopleId;
    private String fullName;
    private String jobTitle;
    private String createBy;
    private Date createDate;

    public PeopleHistoryEntity() {
    }

    @JdbiConstructor
    public PeopleHistoryEntity(
            @ColumnName("id") Long id,
            @ColumnName("full_name") String fullName,
            @ColumnName("job_title") String jobTitle,
            @ColumnName("create_by") String createBy,
            @Nullable @ColumnName("create_date") Date createDate)
    {
        this.id = id;
        this.fullName = fullName;
        this.jobTitle = jobTitle;
        this.createBy = createBy;
        this.createDate = createDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

}
