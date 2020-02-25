package thaisamut.msa.awesome.api.v1;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;

public class People {

    private Long id;

    @Schema(example = "John Rambo")
    private String fullName;

    @Schema(example = "Soldier")
    private String jobTitle;

    @Schema(example = "30")
    private Integer age;

    private Date birthday;

    public People() {
    }

    public People(Long id, String fullName, String jobTitle, Integer age, Date birthday) {
        this.id = id;
        this.fullName = fullName;
        this.jobTitle = jobTitle;
        this.age = age;
        this.birthday = birthday;
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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
}
