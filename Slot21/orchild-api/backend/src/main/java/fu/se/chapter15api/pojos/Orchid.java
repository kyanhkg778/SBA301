package fu.se.chapter15api.pojos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "Orchid")
public class Orchid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrchidID")
    private Integer orchidId;

    @Column(name = "OrchidName", nullable = false)
    private String orchidName;

    @JsonProperty("natural")
    @Column(name = "IsNatural", nullable = false)
    private boolean isNatural;

    @Column(name = "OrchidDescription", length = 1000)
    private String orchidDescription;

    @Column(name = "OrchidCategory")
    private String orchidCategory;

    @JsonProperty("attractive")
    @Column(name = "IsAttractive", nullable = false)
    private boolean isAttractive;

    @Column(name = "OrchidURL", length = 1000)
    private String orchidURL;

    public Orchid() {
    }

    public Orchid(Integer orchidId, String orchidName, boolean isNatural, String orchidDescription,
                  String orchidCategory, boolean isAttractive, String orchidURL) {
        this.orchidId = orchidId;
        this.orchidName = orchidName;
        this.isNatural = isNatural;
        this.orchidDescription = orchidDescription;
        this.orchidCategory = orchidCategory;
        this.isAttractive = isAttractive;
        this.orchidURL = orchidURL;
    }

    public Integer getOrchidId() {
        return orchidId;
    }

    public void setOrchidId(Integer orchidId) {
        this.orchidId = orchidId;
    }

    public String getOrchidName() {
        return orchidName;
    }

    public void setOrchidName(String orchidName) {
        this.orchidName = orchidName;
    }

    @JsonProperty("natural")
    public boolean isNatural() {
        return isNatural;
    }

    @JsonProperty("natural")
    public void setNatural(boolean natural) {
        this.isNatural = natural;
    }

    public boolean getNatural() {
        return isNatural;
    }

    public String getOrchidDescription() {
        return orchidDescription;
    }

    public void setOrchidDescription(String orchidDescription) {
        this.orchidDescription = orchidDescription;
    }

    public String getOrchidCategory() {
        return orchidCategory;
    }

    public void setOrchidCategory(String orchidCategory) {
        this.orchidCategory = orchidCategory;
    }

    @JsonProperty("attractive")
    public boolean isAttractive() {
        return isAttractive;
    }

    @JsonProperty("attractive")
    public void setAttractive(boolean attractive) {
        this.isAttractive = attractive;
    }

    public boolean getAttractive() {
        return isAttractive;
    }

    public String getOrchidURL() {
        return orchidURL;
    }

    public void setOrchidURL(String orchidURL) {
        this.orchidURL = orchidURL;
    }
}
