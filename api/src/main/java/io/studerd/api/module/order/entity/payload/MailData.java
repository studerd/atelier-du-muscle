package io.studerd.api.module.order.entity.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailData {
    private String name;
    private String mail;
    private String phone;
    private String message;
}
