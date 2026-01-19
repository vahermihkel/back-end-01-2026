package ee.mihkel.rendipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double initialFee;
    private double lateFee;

    @ManyToMany
    private List<Film> films;

//    @OneToMany
//    private List<Film> notReturnedFilms;
}
