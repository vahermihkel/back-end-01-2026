package ee.mihkel.veebipood.dto;

import ee.mihkel.veebipood.entity.Address;
import ee.mihkel.veebipood.entity.Role;
import lombok.Data;
//
//public record PersonDto(
//        Long id,
//        String firstName,
//        String lastName,
//        String email,
//        Role role,
//        Address address
//) {
//}

@Data
public class PersonDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private Address address;
}
