package ee.mihkel.rendipood.dto;

import ee.mihkel.rendipood.entity.FilmType;
import lombok.Data;

@Data
public class FilmAddDto {
    private String title;
    private FilmType type;
}
