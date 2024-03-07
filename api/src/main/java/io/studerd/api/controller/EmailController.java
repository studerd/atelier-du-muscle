package io.studerd.api.controller;

import io.studerd.api.common.entity.ApiResponse;
import io.studerd.api.common.service.EmailService;
import io.studerd.api.module.order.entity.payload.MailData;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("message")
@RequiredArgsConstructor
@Tag(name = "Message", description = "Message API")
public class EmailController {
    public final EmailService emailService;
  
    @PostMapping("send")
    public ApiResponse mail(@RequestBody MailData payload) {
        try{
            this.emailService.sendMail(payload);
            return new ApiResponse(true, "Votre message a bien été reçu ! Nous vous recontacterons !", "api.mail.send-error");
        }catch(Exception e){
            return new ApiResponse(false, e.getMessage(), "api.mail.send-error");
        }
    }
}
