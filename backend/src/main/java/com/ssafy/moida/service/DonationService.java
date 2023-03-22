package com.ssafy.moida.service;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.model.ProjectDonation;
import com.ssafy.moida.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 기부 기능 - 기부 DB 테이블 사이의 브릿지
 */
@Service
@Transactional
public class DonationService {
    private final DonationRepository donationRepository;

    public DonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    public ProjectDonation save(DonationDto dd){;

        ProjectDonation projectDonation = ProjectDonation.builder()
            .startDate(dd.getStartDate())
            .endDate(dd.getEndDate())
            .amount(0L)
            .targetAmount(dd.getTargetAmount())
            .subject(dd.getSubject())
            .description(dd.getDescription())
            .build();

        donationRepository.save(projectDonation);
        return projectDonation;
    }
}
