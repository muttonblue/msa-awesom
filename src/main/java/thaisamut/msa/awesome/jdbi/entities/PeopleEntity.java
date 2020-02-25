package thaisamut.msa.awesome.jdbi.entities;

public class PeopleEntity {

    private Long id;
    private String fullName;
    private String jobTitle;

    public PeopleEntity() {
    }

    public PeopleEntity(Long id, String fullName, String jobTitle) {
        this.id = id;
        this.fullName = fullName;
        this.jobTitle = jobTitle;
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
}
