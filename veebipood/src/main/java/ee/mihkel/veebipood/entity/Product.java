package ee.mihkel.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private Double price;

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
