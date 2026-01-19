package ee.mihkel.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double price; // Double -> saab null väärtuseks panna (double ei saaks)
//    @ColumnDefault("false")
    private boolean active; // boolean -> ei saa null väärtuseks panna (Boolean ei saaks)

    // @ManyToMany     List<Category> categories
    // @OneToMany      List<Category> categories
    // @OneToOne       Category category;
    // @ManyToOne      Category category;

    @ManyToOne
    private Category category;

    // int --> 2.1miljardit
    // Long --> kõvasti suurem
    // double --> komakohaga
}
