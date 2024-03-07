package io.studerd.api.module.order.repository;

import io.studerd.api.module.order.entity.ClientOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<ClientOrder, UUID> {
    @Query("SELECT co FROM ClientOrder  co WHERE co.profile.profile_id=:uuid")
    List<ClientOrder> findAllForProfile(UUID uuid);
    @Query("SELECT co FROM ClientOrder  co WHERE co.status=:status")
    List<ClientOrder> findAllForStatus(String status);

    @Query("SELECT co FROM ClientOrder  co WHERE co.status='WAITING_CLIENT_FINALIZATION' and co.mailSended = false")
    List<ClientOrder> getNoValidateOrder();
    @Query("SELECT co FROM ClientOrder  co WHERE co.status='WAITING_CLIENT_PAYMENT' and co.mailSended = false")
    List<ClientOrder> getNoPaymentOrder();
}
