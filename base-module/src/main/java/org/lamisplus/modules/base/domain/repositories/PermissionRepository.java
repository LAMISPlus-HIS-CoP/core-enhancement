package org.lamisplus.modules.base.domain.repositories;

import org.lamisplus.modules.base.domain.entities.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByNameAndArchived(String name, int archived);

    @Query(value = "SELECT * FROM base_permission where name ilike ?1 AND archived=0", nativeQuery = true)
    List<Permission> findAllByNameIsLike(String name);

    List<Permission> findByNameNotIn(List<String> name);

    List<Permission> findAllByArchived(int archived);

    Optional<Permission> findByDescriptionAndArchived(String description, int archived);
}
