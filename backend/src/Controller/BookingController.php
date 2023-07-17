<?php

namespace App\Controller;

use App\Entity\Ride;
use App\Entity\Booking;
use App\Repository\RideRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\BookingRepository;

class BookingController extends AbstractController

{
    private $entityManager;
    private $userRepository;
    private $rideRepository;

    public function __construct(EntityManagerInterface $entityManager, UserRepository $userRepository , RideRepository $rideRepository)
       {
          $this->entityManager = $entityManager;
          $this->userRepository = $userRepository;
          $this->rideRepository = $rideRepository;
   
        }
    /**
     * @Route("/new-booking", name="new_booking", methods={"POST"})
     *  @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function bookRide(Request $request, ValidatorInterface $validator): JsonResponse

    {  
        // Retrieve les datas
        $idUser = $request->get('idUser');
        $idRide = $request->get('idRide');
        $user = $this->userRepository->find($idUser);
        $ride = $this->rideRepository->find($idRide);
        $placesNumber = $request->get('placesNumber');

       // Check if the requested places exceed the available places in the ride
        if ($placesNumber > $ride->getPlaceDispo() OR $placesNumber == 0) {
            return new JsonResponse('No available seats for this ride.', Response::HTTP_BAD_REQUEST);
        }
           // Perform the booking process
        $booking = new Booking();
        $booking->setUser($user);
        $booking->setRide($ride);
        $booking->setPlacesNumber($placesNumber);
   
        // Update the ride entity
        $ride->setPlaceDispo($ride->getPlaceDispo() - $placesNumber);

        // Persist the entities to the database
        $this->entityManager->persist($booking);
        $this->entityManager->flush();

        // Return a response indicating the successful booking
        return new JsonResponse('Ride booked successfully!', Response::HTTP_OK);
    }
}

