package io.studerd.api.common.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.studerd.api.common.service.EmailService;
import io.studerd.api.module.order.entity.ClientOrder;
import io.studerd.api.module.order.entity.OrderLine;
import io.studerd.api.module.order.entity.payload.MailData;
import io.studerd.api.security.credential.entity.request.SignupRequest;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EmailServiceImpl implements EmailService {
    private final TemplateEngine templateEngine;
    public final JavaMailSender mailSender;
    public final MailContentBuilder builder;
    public final String backMail = "atelierdumuscle@gmail.com";

    @Override
    public void sendWaitingInDelivery(ClientOrder order) {
        try {

            MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            message.setFrom("info@atelierdumuscle.be");
            message.setTo(order.getProfile().getEmail());
            message.setSubject("Votre commande " + order.getReference() + " est en chemin");
            message.setText(this.getInDeliveryHtml(order), true);
            this.mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void sendDelivered(ClientOrder order) {
        try {

            MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            message.setFrom("info@atelierdumuscle.be");
            message.setTo(order.getProfile().getEmail());
            message.setSubject("Votre commande " + order.getReference() + " a été réceptionné");
            message.setText(this.getDeliveredHtml(order), true);
            this.mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void sendInProduction(ClientOrder order) {
        try {
            MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            message.setFrom("info@atelierdumuscle.be");
            message.setTo(order.getProfile().getEmail());
            message.setSubject("Votre commande " + order.getReference() + " est en production");

            message.setText(this.getInProductionEmail(order), true);
            this.mailSender.send(mimeMessage);
            this.sendBackCancel(order);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void sendWaitingPayment(ClientOrder order) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            message.setFrom(new InternetAddress("info@atelierdumuscle.be"));
            message.setRecipients(MimeMessage.RecipientType.TO, this.backMail);
            message.setSubject("Une nouvelle commande  " + order.getProfile().getEmail());
            message.setText("Une nouvelle commande vient d'arriver : " + order.getReference());
            mailSender.send(message);
            this.sendWaitingClientPayment(order);

        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    public void sendWaitingClientPayment(ClientOrder order) {
        try {
            MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            message.setFrom("info@atelierdumuscle.be");
            message.setTo(order.getProfile().getEmail());
            message.setSubject("Votre commande " + order.getReference());

            message.setText(this.getClientFinalize(order), true);
            this.mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void sendMail(MailData data) {
        try {
            String msg = data.getMail() + " vous a envoyé un message: <br />" + data.getMessage() + "<br /><br /> Coordonnées<br />---------------<br>";
            msg += "Nom :" + data.getName() + "<br />";
            msg += "Mail :" + data.getMail() + "<br />";
            msg += "Phone :" + data.getPhone() + "<br />";

            MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            // message.setFrom("info@atelierdumuscle.be");
            message.setFrom(data.getMail());
            message.setTo(this.backMail);
            message.setSubject("[ADM Contact form] " + data.getMail() + " vous a envoyé un message");
            message.setText(msg, true);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void newClient(SignupRequest data) {
        try {
            MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            message.setFrom("info@atelierdumuscle.be");
            message.setTo(data.getUsername());
            message.setSubject("Bienvenu sur l'Atelier du muscle");

            message.setText(this.getNewClient(), true);
            this.mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void sendDontForgetToValidate(ClientOrder order) {
        try {
            MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            message.setFrom("info@atelierdumuscle.be");
            message.setTo(order.getProfile().getEmail());
            message.setSubject("Votre commande " + order.getReference() + " vous attend");

            message.setText(this.getDontForgetToValidate(order), true);
            this.mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void sendDontForgetToPay(ClientOrder order) {
        try {
            MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            message.setFrom("info@atelierdumuscle.be");
            message.setTo(order.getProfile().getEmail());
            message.setSubject("Votre commande " + order.getReference() + " vous attend");

            message.setText(this.getDontForgetToPay(order), true);
            this.mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void sendToNico(ClientOrder accountOrder) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            MimeMessage message = mailSender.createMimeMessage();
            message.setFrom(new InternetAddress("info@atelierdumuscle.be"));
            message.setRecipients(MimeMessage.RecipientType.TO, "ledent.n@gmail.com");
            message.setSubject("Nouvelle commande  ");
            message.setText(mapper.writeValueAsString(accountOrder));
            mailSender.send(message);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }


    public void sendBackCancel(ClientOrder order) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            message.setFrom(new InternetAddress("info@atelierdumuscle.be"));
            message.setRecipients(MimeMessage.RecipientType.TO, this.backMail);
            message.setSubject("Nouvelle commande  " + order.getProfile().getEmail());
            message.setText("Une commande vient d'être payée : " + order.getReference());
            mailSender.send(message);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }

    @Override
    public void sendCanceled(ClientOrder order) {
        try {
            MimeMessage mimeMessage = this.mailSender.createMimeMessage();
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
            message.setFrom("info@atelierdumuscle.be");
            message.setTo(order.getProfile().getEmail());
            message.setSubject("Votre commande " + order.getReference() + " a été annulée");
            message.setText(this.getCanceledEmail(order), true);
            this.mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error(e.getMessage());
        }

    }

    private String getClientFinalize(ClientOrder order) {
        float amount = order.getLines().stream().map(OrderLine::getTotalPrice).reduce(Float::sum).get() + ClientOrder.calculateEstimatedCost(order);

        Context context = new Context();
        context.setVariable("amount", String.format("%.2f", amount) + "€");
        context.setVariable("paypal", String.format("%.2f", amount * 1.04) + "€");
        context.setVariable("orderLink", "https://atelierdumuscle.be/order/detail/" + order.getClient_order_id());

        return templateEngine.process("waitingPaymentTemplate", context);
    }

    private String getNewClient() {
        Context context = new Context();
        return templateEngine.process("welcomeTemplate", context);
    }

    private String getInProductionEmail(ClientOrder order) {
        Context context = new Context();
        context.setVariable("orderLink", "https://atelierdumuscle.be/order/detail/" + order.getClient_order_id());
        return templateEngine.process("inProductionTemplate", context);
    }

    private String getDontForgetToValidate(ClientOrder order) {
        Context context = new Context();
        context.setVariable("orderLink", "https://atelierdumuscle.be/order/detail/" + order.getClient_order_id());
        return templateEngine.process("orderWaitingYouTemplate", context);
    }

    private String getDontForgetToPay(ClientOrder order) {
        Context context = new Context();
        context.setVariable("orderLink", "https://atelierdumuscle.be/order/detail/" + order.getClient_order_id());
        return templateEngine.process("orderWaitPaymentTemplate", context);
    }

    private String getCanceledEmail(ClientOrder order) {
        Context context = new Context();
        return templateEngine.process("cancelTemplate", context);
    }

    private String getInDeliveryHtml(ClientOrder order) {
        Context context = new Context();
        context.setVariable("trackingURL", order.getTrackingURL());
        context.setVariable("orderLink", "https://atelierdumuscle.be/order/detail/" + order.getClient_order_id());
        return templateEngine.process("inDeliveryTemplate", context);
    }

    private String getDeliveredHtml(ClientOrder order) {
        Context context = new Context();
        return templateEngine.process("livredTemplate", context);
    }
}
